import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/dist/client/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Mapcomp from '../components/Mapcomp';

function Search({ searchResult }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range}  | ${noOfGuests}`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays {range} for {noOfGuests} guests
          </p>
          <h1 className='text-3xl pt-4 pb-4'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'> Cancellation FLexibility</p>
            <p className='button'> Type of Place</p>
            <p className='button'> Price</p>
            <p className='button'> Rooms and Beds</p>
            <p className='button'> More filters</p>
          </div>
          <div className='flex-col'>
            {searchResult.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className='xl:inline-flex xl:min-w-[400px]'>
          <Mapcomp searchResult={searchResult} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );
  return {
    props: {
      searchResult,
    },
  };
}
