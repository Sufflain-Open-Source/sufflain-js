/* 
Copyright (C) 2022 Timofey Chuchkanov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { setName, setGroup, removeName, removeGroup } from '../data/local.js';
import { UserType } from '../shared/const.js';

// saveEntity :: Object -> Boolean
function saveEntity({ checkedUserType, entity }) {
    if (entity.trim() != '') {
        if (checkedUserType == UserType.student) {
            setGroup(entity);
            removeName();
        } else {
            setName(entity);
            removeGroup();
        }

        return true;
    }

    return false
}

export { saveEntity };
