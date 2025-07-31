import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaidIcon from '@mui/icons-material/Paid';
import HouseIcon from '@mui/icons-material/House';
import EggAltIcon from '@mui/icons-material/EggAlt';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AppleIcon from '@mui/icons-material/Apple';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FaceIcon from '@mui/icons-material/Face';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SubwayIcon from '@mui/icons-material/Subway';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MuseumIcon from '@mui/icons-material/Museum';
import AttractionsIcon from '@mui/icons-material/Attractions';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleIcon from '@mui/icons-material/People';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PetsIcon from '@mui/icons-material/Pets';

import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BadgeIcon from '@mui/icons-material/Badge';
import CoPresentIcon from '@mui/icons-material/CoPresent';
const iconDict = {
   RestaurantIcon: <RestaurantIcon />,
   DirectionsCarIcon: <DirectionsCarIcon />,
   PaidIcon: <PaidIcon />,
   HouseIcon: <HouseIcon />,
   EggAltIcon: <EggAltIcon />,
   LocalPizzaIcon: <LocalPizzaIcon />,
   LocalDiningIcon: <LocalDiningIcon />,
   LocalBarIcon: <LocalBarIcon />,
   LocalCafeIcon: <LocalCafeIcon />,
   IcecreamIcon: <IcecreamIcon />,
   AppleIcon: <AppleIcon />,
   CelebrationIcon: <CelebrationIcon />,
   MenuBookIcon: <MenuBookIcon />,
   FaceIcon: <FaceIcon />,
    LocalGasStationIcon: <LocalGasStationIcon />,
   LocalParkingIcon: <LocalParkingIcon />,
   SubwayIcon: <SubwayIcon />,
   CommuteIcon: <CommuteIcon />,
   LocalTaxiIcon: <LocalTaxiIcon />,
   LocalMoviesIcon: <LocalMoviesIcon />,
   MuseumIcon: <MuseumIcon />,
   AttractionsIcon: <AttractionsIcon />,
   MusicNoteIcon: <MusicNoteIcon />,
   CheckroomIcon: <CheckroomIcon />,
   ShoppingCartIcon: <ShoppingCartIcon />,
   LaptopChromebookIcon: <LaptopChromebookIcon />,
   CardGiftcardIcon: <CardGiftcardIcon />,
   PeopleIcon: <PeopleIcon />,
   CurrencyExchangeIcon: <CurrencyExchangeIcon />,
   RequestQuoteIcon: <RequestQuoteIcon />,
   PetsIcon: <PetsIcon />,
   SchoolIcon: <SchoolIcon />,
   LibraryBooksIcon: <LibraryBooksIcon />,
   BadgeIcon: <BadgeIcon />,
   CoPresentIcon: <CoPresentIcon />
};



export default function iconConvert(iconName) {
    return iconDict.hasOwnProperty(iconName) ? iconDict[iconName] : <PaidIcon />;
}