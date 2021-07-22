/**
 * This file is part of the Magebit WeatherWidget package.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magebit WeatherWidget
 * to newer versions in the future.
 *
 * @copyright Copyright (c) 2021 Magebit, Ltd. (https://magebit.com/)
 * @license   GNU General Public License ("GPL") v3.0
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { module } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const KEY = 'weather-widget'

export const WeatherWidget: StorefrontModule = function ({ app, store, router, moduleConfig, appConfig }) {
  store.registerModule(KEY, module);
}
