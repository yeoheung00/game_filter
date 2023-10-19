import data from '../db/data.json'

type PropsType = {
  data: GameType[],
  stimulation: string,
  ability: string,
  background: string,
  genre: string,
  platform: string
}
type GameType = {
  name: string,
  stimulation: string[],
  ability: string[],
  background: string[],
  genre: string[],
  platform: string[]
}

export default function Display({ data, stimulation, ability, background, genre, platform }: PropsType) {
  console.log('data', data);
  let filter = [];
  for (let i = 0; i < data.length; i++) {
    const temp = data[i];
    if ((temp.stimulation.includes(stimulation) || stimulation == "X") &&
      (temp.ability.includes(ability) || ability == "X") &&
      (temp.background.includes(background) || background == "X") &&
      (temp.genre.includes(genre) || genre == "X") &&
      (temp.platform.includes(platform) || platform == "X")) {
      filter.push(temp);
    }
  }
  //console.log("result", filter);
  return (
    <div>
      {
        filter.map((item, index) => {
          return <p key={index}>{item.name}</p>
        })
      }
    </div>
  )
}