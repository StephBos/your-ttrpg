export default function RulesetPage({
  params,
}: {
  params: { username: string; ruleset: string }
}) {
  const { ruleset } = params

  // Split the slug and id
  const lastDashIndex = ruleset.lastIndexOf("-")
  const slug = ruleset.substring(0, lastDashIndex)
  const id = ruleset.substring(lastDashIndex + 1)

  console.log({ slug, id })

  return (
    <div>
      <h1>Ruleset: {slug}</h1>
      <p>ID: {id}</p>
    </div>
  )
}
