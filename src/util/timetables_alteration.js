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

// groupLessonsWithSameTime :: [Object] -> [Object]
export function groupLessonsWithSameTime(allGroupsLessonsAggregated) {
    const lessonsTime = allGroupsLessonsAggregated.map(lesson => lesson.time);
    const lessonsGroupedByTime = lessonsTime.map(time => allGroupsLessonsAggregated.filter(lesson => lesson.time == time));
    const uniqueLessons = [];

    /*
     * Since we use the map() function to group lessons by time, the grouping happens for all array elements.
     *
     * Therefore, for each group of related lessons, there will be n - 1 duplicates, where n is the number of these lessons.
     *
     * That's why we need to remove all the duplicate groups.
     */
    for (let i = 0; i < lessonsGroupedByTime.length; i++) {
        const rest = lessonsGroupedByTime.slice(i + 1);

        // The easiest way to find duplicates is by comparing elements' time.
        const foundValue = rest.find(el => el[0].time == lessonsGroupedByTime[i][0].time);
        const isDuplicateFound = typeof foundValue == 'object' ? true : false;

        if (isDuplicateFound) continue;

        uniqueLessons.push(lessonsGroupedByTime[i]);
    }

    return uniqueLessons;
}

// putAllGroupsLessonsTogether :: [String Object] -> [Object]
export function putAllGroupsLessonsTogether(allGroupsEntries) {
    const allGroupsEntriesData = allGroupsEntries[1].data; // Omit a timetable hash and select the data without linkTitle
    const allGroupsEntriesWithGeneralTitles = 
        allGroupsEntriesData.map(entry => addGeneralTitleToGroupLessons(entry.title, entry.lessons));
    const aggregatedGroupsLessons = allGroupsEntriesWithGeneralTitles.flat();

    return aggregatedGroupsLessons;
}

// addGeneralTitleToGroupLessons :: String [Object]
export function addGeneralTitleToGroupLessons(title, lessons) {
    const lessonsWithTitle = lessons.map(lesson => Object.create({ ...lesson, title }));

    return lessonsWithTitle;
}
