/**
 * Stylesheets
 */
import '../sass/survey.scss'

/**
 * Localization Module
 */
import './i18n/i18n'

/**
 * Misc. Plug-ins
 */
import './plugins/overlay'
import toastr from 'toastr'
toastr.options = {"positionClass": "toast-top-left"}

/**
 * UI Controllers
 */
import 'angular'
import './survey/ui/JumpTo'
import './survey/ui/Toolbar'
import './survey/ui/Overlays'
import './survey/ui/SessionModal'

/**
 * Entrypoint
 */
import Kernel from './survey/Kernel'
Kernel.boot()