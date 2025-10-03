

export async function createNewRuleset(username: string, rulesetName: string) {
  const response = await fetch("http://localhost:3000/rulesets/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, rulesetName }),
  })

}