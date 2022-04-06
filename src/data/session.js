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

const storage = window.sessionStorage;

const timetablesKey = 'tbl';

// getTimetables :: -> Object
export function getTimetables() {
    return JSON.parse(storage.getItem(timetablesKey));
}

// setTimetables :: Object -> Undefined
export function setTimetables(entity) {
    storage.setItem(timetablesKey, JSON.stringify(entity));
}
