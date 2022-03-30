<!-- 
    We use this file—a top-level _layout.svelte—as a page guard.
    It redirects to the welcome page if the id is not saved by a user.
    Otherwise, it redirects the welcome page to the timetables page.

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
-->

<script>
    import { getGroup, getName } from '../data/local.js';
    import { redirect, route } from '@roxi/routify';

    const group = getGroup();
    const name = getName();

    // We need to clean cached page content to prevent from going back to the welcome page if
    // the user has saved the id.
    window.addEventListener('pageshow', event => { if (event.persisted) window.location.reload() });

    if (!group && !name) {
        $redirect('/welcome');
    }

    if (typeof group == 'string' || typeof name == 'string') {
        if ($route.shortPath == '/welcome')
            $redirect('/timetables');
    } 
</script>

<slot></slot>
