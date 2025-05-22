import {Router} from "express"
import {
    seedScriptForSuperAdmin,
    loginSuperAdmin,
    logoutSuperAdmin,
    refreshAccessToken,
    changePassword,
    getCurrentSuperAdmin
} from "../controllers/superAdmin.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/role.middleware.js"


const router = Router()

// router.route("/seed-script").post(seedScriptForSuperAdmin);   // if you want to add first superAdmin so temporarely active this route and after creating, active below route
router.route("/seed-script").post(seedScriptForSuperAdmin);
router.route("/login-superAdmin").post(loginSuperAdmin);
router.route("/logout-superAdmin").post(verifyJWT, authorizeRoles("superAdmin"), logoutSuperAdmin);
router.route("/refresh-Access-Token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, authorizeRoles("superAdmin"), changePassword);
router.route("/current-superAdmin").get(verifyJWT, authorizeRoles("superAdmin"), getCurrentSuperAdmin);

export default router