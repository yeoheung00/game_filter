import data from '../db/data.json'

type PropsType = {
  data: GameType[],
  stimulation: string,
  ability: string,
  background: string,
  genre: string
}
type GameType = {
  name: string,
  stimulation: string[],
  ability: string,
  background: string,
  genre: string
}

export default function Display({data, stimulation, ability, background, genre }: PropsType) {
  console.log('data', data);
  let filter = [];
  for (let i = 0; i < data.length; i++) {
    const temp = data[i];
    if ((temp.stimulation.includes(stimulation) || stimulation == "none") && (temp.ability == ability || ability == "none") && (temp.background == background || background == "none") && (temp.genre == genre || genre == "none")) {
      filter.push(temp);
    }
  }
  //console.log("result", filter);
  return (
    <div>
      {
        filter.map((item, index) => {
          return <div key={index}>{item.name}</div>
        })
      }
    </div>
  )
}