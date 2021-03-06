/**
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
    along with this program.  If not, see <https:www.gnu.org/licenses/>.
 */

import config from '../../cli-config.js';
import { getServerPub } from '../data/session.js';
import { encryptApiKey } from '../cli-api-tools/main';

const buildFullUrl = (path) => `${config.baseUrl + path}/`;
const groupsFullPath = buildFullUrl(config.paths.groups);
const namesFullPath = buildFullUrl(config.paths.names);
const timetablesFullPath = buildFullUrl(config.paths.timetable);
const teacherTimetablesFullPath = buildFullUrl(config.paths.teacherTimetable);
const orderFullPath = buildFullUrl(config.paths.postsOrder);
const serverPubKeyFullPath = buildFullUrl(config.paths.pubReq);

// fetchServerPubKey :: -> Object
async function fetchServerPubKey() {
    try {
        var response = await fetch(serverPubKeyFullPath);
    } catch (e) {
        return { err: 'Ошибка получения данных' };
    }

    return await response.json();
}

// fetchTeacherTimetables :: String -> Object
async function fetchTeacherTimetables(tid) {
    return await fetchFromDb(teacherTimetablesFullPath + tid);
}

// fetchTimetables :: String -> Object
async function fetchTimetables(gid) {
    return await fetchFromDb(timetablesFullPath + gid);
}

// fetchOrder :: -> Object
async function fetchOrder() {
    return await fetchFromDb(orderFullPath);
}

// fetchNames :: -> [Object]
async function fetchNames() {
    const result = await fetchFromDb(namesFullPath);

    if (result.err)
        return result;

    const data = result.data;
    const iterableData = Object.entries(data);
    const sortedData = iterableData.sort((fst, snd) => fst[1].localeCompare(snd[1]));

    return sortedData;
}

// fetchGroups :: -> [String]
async function fetchGroups() {
    const result = await fetchFromDb(groupsFullPath);
    const data = !result.err ? result.data : result;

    return data;
}

// fetchFromDb :: String -> Object
async function fetchFromDb(fullPath) {
    const error = { err: 'Ошибка получения данных' };
    
    try {
        const payload = await encryptApiKey(getServerPub().pub, config.shared);
        var response = await fetch(fullPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ payload })
        });
    } catch (e) {
        return error;
    }

    if (!response.ok)
        return error;

    return await response.json();
}

export {
    fetchGroups, fetchNames, fetchOrder, fetchTeacherTimetables, fetchTimetables, fetchServerPubKey
};
