import redclient from '../lib/redclient'

type TredServ = {
  redfindBy: (find_expression: string) => Promise<string>
  redSetEx: (
    create_expression: string,
    time: number,
    data: string | object
  ) => Promise<void>
}
export const redServ: TredServ = {
  redfindBy: undefined,
  redSetEx: undefined,
}

redServ.redfindBy = async (find_expression: string) => {
  const client = await redclient
  const rez = await client.get(find_expression)
  return rez
}

redServ.redSetEx = async (
  create_expression: string,
  time: number,
  data: string | object
) => {
  console.log('executed')
  const client = await redclient
  client.setEx(create_expression, time, data)

  console.log('executed2 ')
}
