<!-- 
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
    import WelcomePage from './pages/WelcomePage.svelte';
    import { getGroup, getName } from './data/local.js';
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';

    const group = getGroup();
    const name = getName();
</script>

{#if !group && !name}
    <WelcomePage></WelcomePage>
{:else}
    <h1>main page stub</h1>
{/if}
