import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's payment receipt schema configuration and properties
 */
export const receiptSchema = {
  title: 'User Receipt Schema',
  version: 0,
  description: 'stores users payments receipt schema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string',
      unique: true,
      final: true
    },
    date: {
      type: 'string',
      final: true
    },
    amount: {
      type: 'number',
      final: true
    },
    teacherId: {
      type: 'string',
      final: true
    },
    teacherName: {
      type: 'string',
      final: true
    },
    studentId: {
      type: 'string',
      final: true
    },
    universalId: {
      type: 'string',
      final: true
    },
    session: {
      type: 'string',
      final: true
    },
    term: {
      type: 'string',
      final: true
    },
    class: {
      type: 'string',
      final: true
    },
    createdAt: {
      type: 'string',
      final: true
    },
    updatedAt: {
      type: 'string'
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: ['school']
};

export const receiptModel: CollectionConfig<typeof receiptSchema> = {
  name: EntityNames.Receipt,
  schema: receiptSchema
};
