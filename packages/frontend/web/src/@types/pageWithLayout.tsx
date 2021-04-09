import { NextPage } from 'next'

import AuthLayout from '../layouts/authLayout'
import DefaultLayout from '../layouts/defaultLayout'

type PageWithMainLayoutType = NextPage & { layout: typeof DefaultLayout }

type PageWithPostLayoutType = NextPage & { layout: typeof AuthLayout }

type PageWithLayoutType = PageWithMainLayoutType | PageWithPostLayoutType

export default PageWithLayoutType
