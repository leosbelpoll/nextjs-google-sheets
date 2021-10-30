import { google } from "googleapis";
import mockPosts from "../../mockPosts.json";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const { id } = query;
  const range = `Sheet1!A${id}:C${id}`;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const [title, content] = response.data.values[0];

    return {
      props: {
        title,
        content,
      },
    };
  } catch {
    const { title, content } = mockPosts.find((post) => post.id == id);

    return {
      props: {
        title,
        content,
      },
    };
  }
}

export default function Post({ title, content }) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <br />
      <a href="/posts">Go to the list</a>
    </article>
  );
}
