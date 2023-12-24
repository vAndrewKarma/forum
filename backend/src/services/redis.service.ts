import redclient from '../lib/redclient'

type TredServ = {
  redfindBy: (find_expression: string) => Promise<string>
  redSetEx: (
    create_expression: string,
    time: number,
    data: string | object
  ) => Promise<void>
  redDel: (delete_expression: string) => Promise<void>
}
export const redServ: TredServ = {
  redfindBy: undefined,
  redSetEx: undefined,
  redDel: undefined,
}

redServ.redfindBy = async (find_expression: string) => {
  const client = await redclient
  const rez = await client.get(find_expression)
  return rez
}

redServ.redSetEx = async (
  create_expression: string,
  time: number,
  data: object
) => {
  const client = await redclient
  await client.setEx(create_expression, time, JSON.stringify(data))
}

redServ.redDel = async (delete_expression: string) => {
  const client = await redclient
  await client.del(delete_expression)
}
