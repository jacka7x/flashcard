import { 
  getNewSpacingWrong,
  getCurrentUnixTime 
} from "../scripts/scheduling"

export const fetchDeckFromDB = async () => {
    console.log('Fetching from DB...')
    
    const response: Response = await fetch('http://172.30.1.35:5000/deck')
    const data: Card_IF[] = await response.json()

    // for testing purposes, set all reveiws to current time
    console.log('Setting inital spacing values...')
    console.log(`Base spacing set to ${getNewSpacingWrong()}`)
    console.log(`Current Unix time: ${getCurrentUnixTime()}`)

    const nowUnix: number = getCurrentUnixTime()
    const defaultSpacing: number = getNewSpacingWrong()

    const deckFromDB = data.map( card => {
      return {
        ...card,
        review: {
          review_date: nowUnix + defaultSpacing,
          spacing: defaultSpacing
        }
      }
    })

    return deckFromDB
}