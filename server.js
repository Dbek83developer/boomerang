const jayson = require("jayson/promise");
// const announcements = require("./dao/Announcement");
const annDao = require("./dao/AnnouncementDao");
const comments = require("./dao/Comments");
const log = require("./logger");

const server = jayson.Server({

    addAnn: async ({
                       title,
                       text,
                       owner,
                       owner_phone,
                       counts_view,
                       region,
                       country,
                       img_url,
                       status,
                       due_date,
                       created_at
                   }) => await annDao.create({
        title,
        text,
        owner,
        owner_phone,
        counts_view,
        region,
        country,
        img_url,
        status,
        due_date,
        created_at
    }),
    getListAnn: async () => await annDao.getList(),
    updateAnn: async () => await annDao.update(id, {
        title,
        text,
        owner,
        owner_phone,
        counts_view,
        region,
        country,
        img_url,
        status,
        due_date,
        created_at
    }),
    deleteAnn: async () => await annDao.delete(id),
    getByIdAnn: async (id) => {
        let toUpdate = await annDao.getById(id).count_views + 1;
        await annDao.update(id, toUpdate);
        //логирования
        log('call method getByIdAnn and increase count views');
        return annDao.getById(id)

    },
    getByCountryAnn: async () => await annDao.getByCountry(country),
    getCommList: async () => await comments.getList(),
    addComm: async ({ann_id, owner_name, text}) => await comments.create({ann_id, owner_name, text}),
    delComm: async ({id}) => await comments.delete(id),
    editComm: async ({id, data }) => await comments.update(data)
});

server.http().listen(3000,()=>{
    //логирования log.txt
    log('listenig on port 3000');
});
console.log("server is running");
