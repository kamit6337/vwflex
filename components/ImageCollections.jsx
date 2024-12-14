import { PERSON } from "@constants/mediaType";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const ImageCollections = ({ list, fixed, mediaType = null }) => {
  const { imageDetail } = fixed;

  const isPerson = mediaType === PERSON;

  return (
    <div
      className={
        isPerson
          ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-5 pb-20 pt-10"
          : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-5 pb-20 pt-10"
      }
    >
      {list.map((obj, i) => {
        const { path } = obj;
        const createPhoto = `${imageDetail.secure_base_url}w300${path}`;
        const originalPhoto = `${imageDetail.secure_base_url}original${path}`;

        if (isPerson) {
          return (
            <div key={i} className="w-full">
              <img
                src={createPhoto}
                alt={`Photo ${i}`}
                className="w-full object-cover rounded-md"
              />
            </div>
          );
        }

        return (
          <Dialog key={i}>
            <DialogTrigger className="w-full cursor-pointer">
              <img
                src={createPhoto}
                alt={`Photo ${i}`}
                className="w-full object-cover rounded-md"
              />
            </DialogTrigger>
            <DialogContent className="max-w-screen-lg p-0 top-[52%]">
              <img
                src={originalPhoto}
                alt={`Photo ${i}`}
                className="w-full object-cover rounded-md"
              />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default ImageCollections;
