import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import ProtectedPage from '../_components/ProtectedPage'

function BillingAddressContent() {
  return (
    <form className="max-w-4xl rounded-xl md:border md:p-6" action="#" method="post">
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block">
          <Label>Country</Label>
          <Select className="mt-1">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>VietNam</option>
            <option>Japan</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>State/Province/Region *</Label>

          <Select className="mt-1">
            <option value="ha'apai">{`Ha'apai`}</option>
            <option value="tongatapu">Tongatapu</option>
            <option value="vava'u">{`Vava'u`}</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>Address Line 1 *</Label>

          <Input type="text" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Address Line 2</Label>

          <Input type="text" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>City *</Label>

          <Input type="text" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Postal/ZIP Code *</Label>

          <Input type="text" className="mt-1" />
        </Field>
        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Update Billing address</ButtonPrimary>
        </div>
      </Fieldset>
    </form>
  )
}

export default function BillingAddressPage() {
  return (
    <ProtectedPage>
      <BillingAddressContent />
    </ProtectedPage>
  )
}
