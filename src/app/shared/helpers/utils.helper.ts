import { merge } from 'lodash';
import DateTimeConvertHelper from './date-time-convert.helper';

export default class Utils{
  static createFilterParam(filter: any): any {
    for (const key in filter) {
      if (filter[key] instanceof Date) {
        filter[key] = DateTimeConvertHelper.fromDtObjectToTimestamp(
          filter[key]
        );
      }
    }
    return merge({}, filter);
  }
}
