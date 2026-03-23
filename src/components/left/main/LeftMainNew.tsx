import type { FC } from '../../../lib/teact/teact';
import {
  memo, useEffect, useRef, useState,
} from '../../../lib/teact/teact';
import { getActions } from '../../../global';

import type { FolderEditDispatch } from '../../../hooks/reducers/useFoldersReducer';
import { LeftColumnContent } from '../../../types';

import { DEBUG } from '../../../config';
import { IS_TAURI } from '../../../util/browser/globalEnvironment';
import { IS_TOUCH_ENV } from '../../../util/browser/windowEnvironment';
import buildClassName from '../../../util/buildClassName';

import useInterval from '../../../ho