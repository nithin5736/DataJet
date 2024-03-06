// import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { Query } from '../../interfaces';
import axios from 'axios';

// const encodedConnectionString =
//   'mongodb+srv://anshajkhare:mongomaximl@cluster0.zjoo6vm.mongodb.net/';

let res = {};

export async function mongodbRun(query: Query) {
  console.log('Hello');
  const connectionString = query.options.connectionString;
  console.log(connectionString);
  const type = query.options.type;
  const collection = query.options.collection;
  // const pipeline = query.options.pipeline;
  const document = query.options.document;
  const options = query.options.mongoooptions;
  const filter = query.options.filter;
  // const field = query.options.field;
  const updatedContent = query.options.updatedContent;
  // const replacedContent = query.options.replacedContent;

  //switch case logic of mongodb should be present here
  console.log('mongo')
  try {
    switch (type) {
      case 'List Collections':
        res = await axios.post('mongodb/collections', { connectionString: connectionString });
        console.log(res)
        break;
      case 'Insert One':
        console.log(connectionString, collection, document)
        res = await axios.post('mongodb/insert', { connectionString: connectionString, queryOptions: { collection: collection, document: document, options: options } })
        break;
      // case 'Insert Many':
      //   if (collection !== undefined && document !== undefined && options !== undefined) {
      //     res = await db
      //       .collection(collection)
      //       .insertMany(JSON.parse(document), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid input' };
      //   }
      //   break;
      // case 'Find One':
      //   if (collection !== undefined && filter !== undefined && options !== undefined) {
      //     res = await db.collection(collection).findOne(JSON.parse(filter), JSON.parse(options)) as {};
      //   } else {
      //     res = { error: 'Invalid input' };
      //   }
      //   break;
      case 'Find Many':
        res = await axios.post('mongodb/findMany', { connectionString: connectionString, queryOptions: { collection: collection, filter: filter, options: options } })
        break;
      // case 'Total Count':
      //   if (collection !== undefined && options !== undefined) {
      //     res = await db.collection(collection).estimatedDocumentCount(JSON.parse(options));
      //     res = { count: res };
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Count':
      //   if (collection !== undefined && filter !== undefined && options !== undefined) {
      //     res = await db
      //       .collection(collection)
      //       .countDocuments(JSON.parse(filter), JSON.parse(options));
      //     res = { count: res };
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Distinct':
      //   if (
      //     collection !== undefined &&
      //     field !== undefined &&
      //     filter !== undefined &&
      //     options !== undefined
      //   ) {
      //     res = await db
      //       .collection(collection)
      //       .distinct(field, JSON.parse(filter), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      case 'Update One':
        res = await axios.post('mongodb/update', {
          connectionString: connectionString, queryOptions: { collection: collection, filter: filter, update: updatedContent, options: options }
        })
        break;
      // case 'Update Many':
      //   if (
      //     collection !== undefined &&
      //     filter !== undefined &&
      //     updatedContent !== undefined &&
      //     options !== undefined
      //   ) {
      //     res = await db
      //       .collection(collection)
      //       .updateMany(JSON.parse(filter), JSON.parse(updatedContent), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Replace One':
      //   if (
      //     collection !== undefined &&
      //     filter !== undefined &&
      //     replacedContent !== undefined &&
      //     options !== undefined
      //   ) {
      //     res = await db
      //       .collection(collection)
      //       .replaceOne(JSON.parse(filter), JSON.parse(replacedContent), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Find One and Replace':
      //   if (
      //     collection !== undefined &&
      //     filter !== undefined &&
      //     replacedContent !== undefined &&
      //     options !== undefined
      //   ) {
      //     res = await db
      //       .collection(collection)
      //       .findOneAndReplace(
      //         JSON.parse(filter),
      //         JSON.parse(replacedContent),
      //         JSON.parse(options)
      //       );
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Find One and Update':
      //   if (
      //     collection !== undefined &&
      //     filter !== undefined &&
      //     updatedContent !== undefined &&
      //     options !== undefined
      //   ) {
      //     res = await db
      //       .collection(collection)
      //       .findOneAndUpdate(JSON.parse(filter), JSON.parse(updatedContent), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      case 'Delete One':
        res = await axios.post('mongodb/delete', {
          connectionString: connectionString, queryOptions: { collection: collection, filter: filter, options: options }
        })
        break;
      // case 'Delete Many':
      //   if (collection !== undefined && filter !== undefined && options !== undefined) {
      //     res = await db.collection(collection).deleteMany(JSON.parse(filter), JSON.parse(options));
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
      // case 'Aggregate':
      //   if (collection !== undefined && pipeline !== undefined && options !== undefined) {
      //     res = await db
      //       .collection(collection)
      //       .aggregate(JSON.parse(pipeline), JSON.parse(options))
      //       .toArray();
      //   } else {
      //     res = { error: 'Invalid entry' };
      //   }
      //   break;
    }
  } catch (error) {
    res = { error: error };
  }
  console.log(res);
  return res;
}

// mongodbRun();

// export default mongodbRun;
