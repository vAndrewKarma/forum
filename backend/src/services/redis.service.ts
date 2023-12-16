import redclient from '../lib/redclient'
export const redfindBy = async (find_expression: string) => {
  const client = await redclient
  const rez = await client.get(find_expression)
  return rez
}
