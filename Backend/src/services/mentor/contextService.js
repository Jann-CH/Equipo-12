import * as userService from "../userService.js";
import * as taskService from "../taskService.js";
import * as contentService from "../contentService.js";

export async function getContext(uid){

    const profile = await userService.getUserProfile(uid);

    const tasks = await taskService.getTasks(uid);

    const contents = await contentService.getContent(uid);

    return {

        profile,

        tasks,

        contents

    };

}