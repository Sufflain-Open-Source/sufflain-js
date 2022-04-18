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

import {
    requestTimetablesEventName,
    timetablesLoadedEvent } from './events/custom-window-events';
import { getGroup, getName } from './data/local.js';
import { fetchTeacherTimetables, fetchTimetables } from './data/remote.js';
import { setTimetables } from './data/session.js';
import { setupEncryption } from './cli-api-tools/main.js';
import "./global.css";
import HMR from "@roxi/routify/hmr";
import App from "./App.svelte";

await setupEncryption();

const app = HMR(App, { target: document.body }, "routify-app");

window.addEventListener(requestTimetablesEventName, populateSessionStorageWithTimetables);

async function populateSessionStorageWithTimetables() {
    const group = getGroup();
    const name = getName();

    typeof group == 'string' ? 
        setTimetables(Object.entries(await fetchTimetables(group))) : 
        setTimetables(Object.entries(await fetchTeacherTimetables(name)))

    dispatchEvent(timetablesLoadedEvent);
}

export default app;
