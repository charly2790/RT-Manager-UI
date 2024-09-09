import { navbarItems } from "../consts";

export const availableMenus = ( rol ) => navbarItems.filter( item => item.allowedRoles.includes(rol));