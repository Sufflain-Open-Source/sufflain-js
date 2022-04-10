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
    export let link;
    export let title;
</script>

<a class="linkCard" href={ link }>{ title }</a>

<style>
    a.linkCard {
        display: block;
        padding: 1.11rem .55rem 1.11rem .55rem;
        margin: 2.22rem 1.11rem 0 1.11rem;
        color: var(--dark-red);
        background-color: var(--light-blue);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, .3);
        text-align: center;
    }
</style>