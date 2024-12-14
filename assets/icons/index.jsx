import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import {
  PiNoteLight,
  PiNotebookLight,
  PiShareFatLight,
  PiNoteFill,
} from "react-icons/pi";
import { FaStackOverflow } from "react-icons/fa";
import {
  AiOutlineSetting,
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineTag,
  AiFillTag,
} from "react-icons/ai";

import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  BiSolidVideos,
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
} from "react-icons/bi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { SlOptionsVertical, SlOptions } from "react-icons/sl";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell, BsBellSlash, BsDot } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdSubscriptions,
  MdOutlineSubscriptions,
  MdOutlineHistory,
} from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const Icons = {
  eyeOff: IoMdEyeOff,
  eyeOn: IoMdEye,
  profile: CgProfile,
  upArrowSolid: TiArrowSortedUp,
  downArrow: IoIosArrowDown,
  upArrow: IoIosArrowUp,
  setting: AiOutlineSetting,
  search: AiOutlineSearch,
  plus: AiOutlinePlus,
  homeOutline: IoHomeOutline,
  homeSolid: IoHomeSharp,
  notes: PiNoteLight,
  notesSolid: PiNoteFill,
  notebooks: PiNotebookLight,
  tagOutline: AiOutlineTag,
  tagSolid: AiFillTag,
  share: PiShareFatLight,
  stack: FaStackOverflow,
  outlineSubscription: MdOutlineSubscriptions,
  solidSubscription: MdSubscriptions,
  outlineHome: AiOutlineHome,
  solidHome: AiFillHome,
  solidVideo: BiSolidVideos,
  hamburger: RxHamburgerMenu,
  cancel: RxCross2,
  micOn: IoMdMic,
  micOff: IoMdMicOff,
  video: RiVideoAddLine,
  bellOn: BsBell,
  bellOff: BsBellSlash,
  leftArrow: MdKeyboardArrowLeft,
  rightArrow: MdKeyboardArrowRight,
  likeIcon: BiLike,
  solidLikeIcon: BiSolidLike,
  dislikeIcon: BiDislike,
  solidDislikeIcon: BiSolidDislike,
  shareDark: IoIosShareAlt,
  options: SlOptionsVertical,
  horizontalOptions: SlOptions,
  singleDot: BsDot,
  download: LiaDownloadSolid,
  history: MdOutlineHistory,
};
