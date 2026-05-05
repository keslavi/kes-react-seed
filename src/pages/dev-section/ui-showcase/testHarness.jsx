import { useEffect } from "react";
import { yupResolver } from '@/helpers/form-validation';
import React from "react";

import {
  FormProvider,
  Row,
  useFormProvider,
} from "components";

const hasRowComponent = (children) => {
  return React.Children.toArray(children).some(child => {
    if (child?.type === Row) return true;
    if (React.isValidElement(child) && child.props.children) {
      return hasRowComponent(child.props.children);
    }
    return false;
  });
};

export const TestHarness = ({
  item = {},
  schema,
  children,
  noRow = false,
  noResults = false,
}) => {

  // Create resolver from schema if provided
  const resolver = schema ? yupResolver(schema) : undefined;

  // React hook form and validation
  const formMethods = useFormProvider({
    resolver,
    defaultValues: item,
  });
  const { reset } = formMethods;

  // Reset form with item when it changes
  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      reset(item);
    }
  }, [item, reset]);

  const onSubmit = (values) => {
    // Display submitted values in the textarea
    const textarea = document.getElementById('submit-results');
    if (textarea) {
      textarea.value = JSON.stringify(values, null, 2);
    }
    // Note: onSubmit prop is handled by FormProvider
  };

  return (
    <FormProvider {...{ formMethods, onSubmit }}>
      {!noRow ? <Row>{children}</Row> : children}
      {!noResults && <>
        <button
          type="submit"
        >
          Submit
        </button>
        <div>
          <label htmlFor="submit-results">submit results</label>
          <br />
          <textarea
            id="submit-results"
            rows={10}
            readOnly
            placeholder="Form submission results will appear here..."
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
      </>}
    </FormProvider >
  );
};

export default TestHarness; 