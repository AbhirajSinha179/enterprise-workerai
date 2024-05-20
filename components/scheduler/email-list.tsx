async function getData( ) {
  // const res = await fetch("https://...", { cache: "no-store" });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const res = {
    json: async () => [
      { id: 1, subject: "Hello", body: "Hello, world!" },
      { id: 2, subject: "Hi", body: "Hi, world!" },
    ],
  };

  return res.json();
}

export default async function EmailList() {
  const data = await getData();
  if (!data) return null;
  
  return <main>
    <ul>
      {data.map((email) => (
        <li key={email.id}>
          <h2>{email.subject}</h2>
          <p>{email.body}</p>
        </li>
      ))}
    </ul>
  </main>;
}