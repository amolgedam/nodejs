/* Factory funtion to return object */

function homeController(){
    return {
        index(req, res){
            res.render("home");
        }
    }
}


module.exports = homeController;