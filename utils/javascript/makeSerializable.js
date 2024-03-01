const makeSerializable = (obj) => {
  console.log("obj", obj);

  const serializable = {
    ...obj,
    _id: obj._id.toString(),
    createdAt: obj.createdAt.getTime(),
    updatedAt: obj.updatedAt.getTime(),
  };

  if (obj.lastLogin) {
    serializable.lastLogin = obj.lastLogin.getTime();
  }

  console.log("serializable", serializable);
  return serializable;
};

export default makeSerializable;
