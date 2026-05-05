import { yup, yupResolver } from '@/helpers/form-validation';
import { TestHarness } from './testHarness';
import { Input } from 'components';

// Example schema
const exampleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  categories: yup.array().min(1, "At least one category is required"),
});

const resolver = yupResolver(exampleSchema);

// Example item with initial values
const exampleItem = {
  name: "John Doe",
  email: "john@example.com",
  categories: [1, 3], // Selected category keys
};

// Example options for select components
const exampleOptions = {
  categories: [
    { key: 1, text: "Category 1" },
    { key: 2, text: "Category 2" },
    { key: 3, text: "Category 3" },
    { key: 4, text: "Category 4" },
  ]
};

export const TestHarnessExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>TestHarness Example</h2>
      <p>This demonstrates how to use the TestHarness component for testing form components.</p>
      
      <TestHarness item={exampleItem} schema={resolver}>
        <Input 
          name="name" 
          label="Name" 
          info="Enter your full name"
        />
        
        <Input 
          name="email" 
          label="Email" 
          info="Enter your email address"
        />
        
        <Input 
          name="categories" 
          label="Categories" 
          optionsCheckbox={exampleOptions.categories}
          info="Select one or more categories"
        />
      </TestHarness>
    </div>
  );
};

export default TestHarnessExample; 