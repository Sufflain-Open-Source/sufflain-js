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

import cors from 'cors';
import config from '../api-config.js';
import express from 'express';
import { Buffer } from 'buffer';
import fetch from 'node-fetch';

const teachersTimetablesUrl = config.baseUrl + config.paths.teachersTimetables;
const timetablesUrl = config.baseUrl + config.paths.timetables;
const orderUrl = config.baseUrl + config.paths.order;
const namesUrl = config.baseUrl + config.paths.names;
const groupsUrl = config.baseUrl + config.paths.groups;

const port = 4870;
const app = express();

app.use(cors());

app.get('/teacher-timetable/:tid', async (req, res) => {
    const teacherTimetable = await fetchById(req.params.tid, teachersTimetablesUrl);
    res.status(200).send(teacherTimetable);
});

app.get('/timetable/:gid', async (req, res) => {
    const groupTimetable = await fetchById(req.params.gid, timetablesUrl);
    console.log(groupTimetable)
    res.status(200).send(groupTimetable);
});

app.get('/groups', async (req, res) => {
    const groups = await fetchFromDb(groupsUrl);
    res.status(200).send(groups);
});

app.get('/names', async (req, res) => {
    const names = await fetchFromDb(namesUrl);
    res.status(200).send(names);
});

app.get('/posts-order', async (req, res) => {
    const order = await fetchFromDb(orderUrl);
    res.status(200).send(order);
});

app.listen(port, () => console.log(`started server at http://localhost:${ port }`));

async function fetchById(id, path) {
    const allTimetables = await fetchFromDb(path);
    const timetable = allTimetables[id];

    return timetable;
}

async function fetchFromDb(fullPath) {
    const credentials = Buffer.from(`${ config.user.name }:${ config.user.password }`).toString('base64');

    const response = await fetch(fullPath, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${ credentials }`
            }
    });

    const json = await response.json();
    const cleanJson = removeInternalFields(json);

    return cleanJson;
}

function removeInternalFields(obj) {
    const { _rev, _id, ...cleanData } = obj;

    return cleanData;
}
