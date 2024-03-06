// Define types for your data
interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface Column {
  title: string;
  dataIndex: string;
  key: string;
}

// Define your data source
const DataSource: DataItem[] = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  },
  {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
];

// Define your columns
const Columns: Column[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

// Export your data and columns if needed
export { DataSource, Columns };
