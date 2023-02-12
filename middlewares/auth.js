 class AuthVer{
    static isLogin = async(req,res,next)=>{
        try{
            if(req.session.user_id){}
            else {

                res.redirect('/login')
                return;
            }
            next();
        } catch (err) {
            console.log(err);
        }
        
    }
    static isLogout = async(req,res,next)=>{
        try{
            if(req.session.user_id){
                res.redirect('/dashboard')
                return;
            }
            
            
            next();
        } catch (err) {
            console.log(err);
        }
        
    }
    static logout = async(req,res)=>{
        try{
            req.session.destroy();
            res.redirect('/login')
        } catch (err) {
            console.log(err);
        }
        
    } }

 export default AuthVer
