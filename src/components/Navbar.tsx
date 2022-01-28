
interface NavbarProps {
  reviewCount: number
}

export const Navbar: React.FC<NavbarProps> = ( {reviewCount} ) => {
  return <div className='navbar'>
      <p className='review-count'>{reviewCount}</p>
    </div>
}