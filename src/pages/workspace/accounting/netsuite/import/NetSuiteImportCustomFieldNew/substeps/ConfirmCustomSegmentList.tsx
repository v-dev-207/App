import React from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import FixedFooter from '@components/FixedFooter';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {CustomFieldSubStepWithPolicy} from '@pages/workspace/accounting/netsuite/types';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NetSuiteCustomFieldForm';

function ConfirmCustomListStep({onNext, onMove}: CustomFieldSubStepWithPolicy) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const [addCustomListFormDraft] = useOnyx(ONYXKEYS.FORMS.NETSUITE_CUSTOM_FIELD_ADD_FORM_DRAFT);

    const fieldNames = [INPUT_IDS.SEGMENT_NAME, INPUT_IDS.INTERNAL_ID, INPUT_IDS.SCRIPT_ID, INPUT_IDS.MAPPING];

    return (
        <View style={styles.flex1}>
            <Text style={[styles.textHeadlineLineHeightXXL, styles.ph5, styles.mb3]}>{translate('workspace.common.letsDoubleCheck')}</Text>
            {fieldNames.map((fieldName, index) => (
                <MenuItemWithTopDescription
                    description={translate(
                        `workspace.netsuite.import.importCustomFields.customSegments.fields.${
                            fieldName === INPUT_IDS.SCRIPT_ID && addCustomListFormDraft?.[INPUT_IDS.CUSTOM_SEGMENT_TYPE] === CONST.NETSUITE_CUSTOM_RECORD_TYPES.CUSTOM_RECORD
                                ? `${CONST.NETSUITE_CUSTOM_RECORD_TYPES.CUSTOM_RECORD}ScriptID`
                                : `${fieldName}`
                        }` as TranslationPaths,
                    )}
                    title={
                        fieldName === INPUT_IDS.MAPPING
                            ? translate(`workspace.netsuite.import.importTypes.${addCustomListFormDraft?.[fieldName]}.label` as TranslationPaths)
                            : addCustomListFormDraft?.[fieldName]
                    }
                    shouldShowRightIcon
                    onPress={() => {
                        onMove(index + 1);
                    }}
                />
            ))}

            <FixedFooter style={[styles.mtAuto]}>
                <Button
                    success
                    large
                    style={[styles.w100]}
                    onPress={onNext}
                    text={translate('common.confirm')}
                />
            </FixedFooter>
        </View>
    );
}

ConfirmCustomListStep.displayName = 'ConfirmCustomListStep';
export default ConfirmCustomListStep;
