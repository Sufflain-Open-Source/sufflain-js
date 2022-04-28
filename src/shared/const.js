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

const UserType = Object.freeze({
    student: 1,
    teacher: 2
});

const alert = {
    title: 'Houston, we have a problem!',
    msg: 'Адрес нашего сервера с трекером расписаний был заблокирован сайтом колледжа по непонятной причине. За обновлениями следите в канале.'
}

export { UserType, alert };
