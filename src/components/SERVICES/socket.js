import io from "socket.io-client";
import {ADDRESS} from "../../config";

let socket = io(ADDRESS);


export default socket;