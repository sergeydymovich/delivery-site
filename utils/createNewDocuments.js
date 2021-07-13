module.exports = {
  createNewDocuments: async (SchemaName, values, newValues) => {
    const arrayValues = values ? values.split(',') : [];
    const arrayNewValues = newValues ? newValues.split(',').map((value) => ({ name: value })) : undefined;
    const createdDocuments = arrayNewValues ? await SchemaName.create(arrayNewValues) : undefined;

    if (createdDocuments) {
      const newDocumentsIds = createdDocuments.map((document) => document._id);
      arrayValues.push(newDocumentsIds);
    }

    return arrayValues;
  }
};