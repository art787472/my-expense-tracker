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
   FaceIcon: <FaceIcon />
};



export default function iconConvert(iconName) {
    return iconDict.hasOwnProperty(iconName) ? iconDict[iconName] : <PaidIcon />;
}