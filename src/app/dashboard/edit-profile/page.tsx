import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import ProtectedPage from '../_components/ProtectedPage'

function EditProfileContent() {
  return (
    <form className="max-w-4xl rounded-xl md:border md:p-6" action="#" method="post">
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block">
          <Label>First name</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Last name</Label>
          <Input placeholder="Doe" type="text" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Current password</Label>
          <Input placeholder="***" type="password" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>New password</Label>
          <Input type="password" className="mt-1" />
        </Field>
        <Field className="block md:col-span-2">
          <Label> Email address</Label>
          <Input type="email" placeholder="example@example.com" className="mt-1" />
        </Field>
        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Update profile</ButtonPrimary>
        </div>
      </Fieldset>
    </form>
  )
}

export default function EditProfilePage() {
  return (
    <ProtectedPage>
      <EditProfileContent />
    </ProtectedPage>
  )
}
