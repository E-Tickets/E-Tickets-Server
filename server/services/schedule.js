const scheduleModel = require('../models/schedule');
const cinemaService = require('./cinema');

const scheduleUtils = {
    strToDate(str) {
        let strDateArray = str.split('-');
        let dateArray = strDateArray.map((str) => {
            return parseInt(str);
        });

        let dateObj = new Date(dateArray[0], dateArray[1] - 1, 
                dateArray[2], dateArray[3], dateArray[4]);
        if (dateObj.getFullYear() === dateArray[0]
            && dateObj.getMonth() === dateArray[1] - 1
            && dateObj.getDate() === dateArray[2]) {
            return dateObj;
        }

        return false;
    },

    dateToStr(date) {
        let dateArray = [];
        dateArray.push(date.getFullYear() + '');
        dateArray.push((date.getMonth() + 1) + '');
        dateArray.push(date.getDate() + '');
        dateArray.push(date.getHours() + '');
        dateArray.push(date.getMinutes() + '');
        
        dateArray = dateArray.map((str) => {
            if (str.length < 2) {
                str = '0' + str;
            }
            return str;
        });

        let dateStr = dateArray[0] + '/' + dateArray[1] + '/'
                + dateArray[2] + '-' + dateArray[3] + ':' + dateArray[4];
        return dateStr;
    },

    formattingSchedule(scheduleArray) {
        let utils = this;
        return scheduleArray.map((scheduleObj) => {
            let date = new Date(scheduleObj.time);
            scheduleObj.time = utils.dateToStr(date);

            return scheduleObj;
        });
    },

    getThreeDateRange(date) {
        let timeBegin, timeEnd;

        if (date) {
            timeBegin = date;
            timeBegin.setHours(0, 0, 0, 0);
            timeEnd = new Date();
            timeEnd.setHours(0, 0, 0, 0);
            timeEnd.setDate(timeEnd.getDate() + 3);           
        } else {
            timeBegin = new Date();
            timeBegin.setHours(0, 0, 0, 0);
            timeEnd = new Date();
            timeEnd.setHours(0, 0, 0, 0);
            timeEnd.setDate(timeEnd.getDate() + 3);
        }

        return {
            'begin': timeBegin,
            'end': timeEnd
        };
    }
};

const schedule = {
    async createSchedule(cinemaId, hallId, timeStr, movieId, price) {
        let res = {};
        let date = scheduleUtils.strToDate(timeStr);
        if (!date) {
            res.status = 'BAD_REQUEST';
            res.message = 'Invalid time string.';
            res.data = {};
        } else {
            let scheduleId = await scheduleModel.createSchedule(cinemaId, 
                    hallId, date.getTime(), movieId, price);
            res.status = 'OK';
            res.message = 'Create schedule successfully.';
            res.data = {
                'schedule_id': scheduleId,
                'movie_id': movieId,
                'cinema_id': cinemaId,
                'hall_id': hallId,
                'time': timeStr,
                'price': price
            };
        }

        return res;
    },

    async getScheduleInfo(scheduleId) {
        let schedulesInfo = await scheduleModel.getScheduleInfo(scheduleId);
        schedulesInfo = scheduleUtils.formattingSchedule(schedulesInfo);

        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedule infomation successfully.';
            res.data = schedulesInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async verifyScheduleOwner(ownerUsername, cinemaId, scheduleId) {
        let verifyInfo = await cinemaService.verifyOwner(ownerUsername, cinemaId);

        if (verifyInfo) {
            let schedulesInfo = await scheduleModel.getScheduleInfo(scheduleId);
            schedulesInfo = scheduleUtils.formattingSchedule(schedulesInfo);

            if (schedulesInfo.length > 0
                && schedulesInfo[0].cinema_id === cinemaId) {
                return true;
            }
        }

        return false;
    },

    async searchScheduleByCinemaId(cinemaId) {
        //let dateRange = scheduleUtils.getThreeDateRange(null);
        let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 4, 2));

        let schedulesInfo = await scheduleModel.searchScheduleByCinemaId(cinemaId, 
                dateRange.begin.getTime(), dateRange.end.getTime());
        schedulesInfo = scheduleUtils.formattingSchedule(schedulesInfo);
        
        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async searchScheduleByMovieId(movieId) {
        //let dateRange = scheduleUtils.getThreeDateRange(null);
        let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 4, 2));

        let schedulesInfo = await scheduleModel.searchScheduleByMovieId(movieId,
                dateRange.begin.getTime(), dateRange.end.getTime());
        schedulesInfo = scheduleUtils.formattingSchedule(schedulesInfo);

        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async searchScheduleByMovieIdLocation(movieId, location) {
        //let dateRange = scheduleUtils.getThreeDateRange(null);
        let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 4, 2));

        let schedulesInfo = await scheduleModel
                .searchScheduleByMovieIdLocation(movieId, location, 
                    dateRange.begin.getTime(), dateRange.end.getTime());
        schedulesInfo = scheduleUtils.formattingSchedule(schedulesInfo);

        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async deleteScheduleById(scheduleId) {
        let res = {};
        try {
            await scheduleModel.deleteScheduleById(scheduleId);
            res.status = 'OK';
            res.message = 'Delete schedule successfully.';
            res.data = {};
        } catch(err) {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    }
};

module.exports = schedule;