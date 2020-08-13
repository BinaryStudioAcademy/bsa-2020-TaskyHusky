export const linksParse = (team: any) => {
  const data = { ...team, links: team.links.map((el: any) => JSON.parse(el)) }
  return data;
}