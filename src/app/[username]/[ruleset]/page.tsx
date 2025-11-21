import RulesetClient from "./RulesetClient";

export default async function RulesetPage({ params }) {
  const { username, ruleset } = await params; // ✅ required in Next 15

  const lastDashIndex = ruleset.lastIndexOf("-");
  const slug = ruleset.substring(0, lastDashIndex);
  const id = ruleset.substring(lastDashIndex + 1);

  return (
    <RulesetClient
      username={username}
      slug={slug}
      id={id}
    />
  );
}
