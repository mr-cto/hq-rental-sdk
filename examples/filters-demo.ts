// Demo: How to use the standalone Filters API
import { filters, FilterExample } from '../src/index';

// Example usage of the Filters API
async function demonstrateFiltersAPI() {
  try {
    // Get filter examples from the API
    const filterExamples: FilterExample[] = await filters.getFilterExamples();

    console.log('Available API Filters:');
    filterExamples.forEach((filter, index) => {
      console.log(`${index + 1}. Field: ${filter.field}`);
      console.log(`   Operators: ${filter.operators.join(', ')}`);
      if (filter.description) {
        console.log(`   Description: ${filter.description}`);
      }
      if (filter.example_values) {
        console.log(`   Example values: ${filter.example_values.join(', ')}`);
      }
      console.log('');
    });
  } catch (error) {
    console.error('Error fetching filter examples:', error);
  }
}

export { demonstrateFiltersAPI };
