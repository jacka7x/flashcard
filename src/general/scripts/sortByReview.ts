
export const sortByReview = (cards: Card_IF[]): Card_IF[] => {

    const sortedCards: Card_IF[] =
        cards.slice().sort((first: Card_IF, second: Card_IF) => {
            const firstDate = first['review']['review_date']
            const secondDate = second['review']['review_date']
            return firstDate - secondDate
        })

    return sortedCards
}
